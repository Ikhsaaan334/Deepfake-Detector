const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const safeName = file.originalname.replace(/\s+/g, '_');
        cb(null, Date.now() + '_' + safeName);
    }
});
const upload = multer({ storage: storage });

app.post('/api/detect', upload.single('mediaUpload'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Tidak ada file yang diunggah!' });
    }

    const filePath = req.file.path;
    const fileName = req.file.filename; // Simpan nama file
    console.log(`[Node.js] File diterima: ${filePath}`);

    const pythonCommand = `python run_yolo.py ${filePath}`;
    console.log(`[Node.js] Mengeksekusi AI: ${pythonCommand}`);

    exec(pythonCommand, (error, stdout, stderr) => {

        if (error) {
            console.error(`[Node.js] Error eksekusi Python: ${error.message}`);
            return res.status(500).json({ error: 'Gagal memproses video dengan AI.' });
        }

        console.log(`[Python Output]:\n${stdout}`);

        let fakeRatio = 0;
        let realRatio = 0;
        let isFake = false;

        const fakeMatch = stdout.match(/> Frame Fake:\s*\d+\s*\(([\d\.]+)%\)/);
        if (fakeMatch && fakeMatch[1]) fakeRatio = parseFloat(fakeMatch[1]);

        const realMatch = stdout.match(/> Frame Real:\s*\d+\s*\(([\d\.]+)%\)/);
        if (realMatch && realMatch[1]) realRatio = parseFloat(realMatch[1]);

        const predMatch = stdout.match(/Prediksi Dominan\s*:\s*(FAKE|REAL|UNKNOWN)/i);
        if (predMatch && predMatch[1]) isFake = predMatch[1].toUpperCase() === 'FAKE';

        const finalScore = isFake ? fakeRatio : realRatio;

        // Kirim nama file ke Frontend
        res.json({
            status: "success",
            isFake: isFake,
            score: Math.round(finalScore),
            fake_ratio: fakeRatio,
            real_ratio: realRatio,
            fileName: fileName 
        });
    });
});

app.listen(PORT, () => {
    console.log(`🚀 API Server IsItReal berjalan di http://localhost:${PORT}`);
});