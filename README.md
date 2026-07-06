# IsItReal - Deepfake Detector

IsItReal is a web-based application designed to detect deepfakes and synthetic media. By utilizing advanced neural networks, it analyzes images and videos to identify manipulated pixels and artifacts, helping you verify the authenticity of digital content.

## 🚀 Features

- **Surgical Accuracy**: Utilizes YOLOv8 and EfficientNet to detect subtle pixel-level manipulations.
- **Omni-Format Support**: Analyze various media formats including MP4, AVI, JPEG, and PNG.
- **Fast Processing**: Cloud-ready architecture that delivers comprehensive analysis results quickly.
- **Biological Truth Check**: Tracks micro-expressions and artifacts that AI generators often fail to replicate accurately.

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3 (Vanilla, Glassmorphism design), JavaScript
- **Backend**: Node.js, Express.js, Multer (for file uploads)
- **AI/Machine Learning**: Python, PyTorch, YOLOv8 (Ultralytics), EfficientNet (timm), OpenCV

## 📋 Prerequisites

Make sure you have the following installed on your system:
- **Node.js** (v14 or higher recommended)
- **Python** (3.8 or higher)
- **pip** (Python package installer)

## ⚙️ Installation & Setup

Follow these steps to get the project running locally:

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd Deepfake-Detector
```

### 2. Install Python Dependencies
It is recommended to use a virtual environment. Install the required Python packages for the AI detection script:

```bash
pip install -r requirements.txt
```
> **Note**: For GPU acceleration (CUDA), ensure you have the appropriate PyTorch version installed for your system (e.g., CUDA 11.8 or 12.1).

### 3. Install Node.js Dependencies
Install the backend dependencies required for the Express server:

```bash
npm install
```

### 4. Run the Application
Start the Node.js server:

```bash
node server.js
```

### 5. Access the Web Interface
Open your web browser and navigate to:
```
http://localhost:3000
```

## 📁 Project Structure

- `index.html`, `detector.html`, `about.html`, `result.html`: Frontend UI pages.
- `style.css`, `script.js`: Frontend styling and logic.
- `server.js`: Node.js Express backend for handling API requests and file uploads.
- `run_yolo.py`: Core Python script that executes the deepfake detection model using YOLOv8.
- `requirements.txt`: Python dependencies.
- `package.json`: Node.js dependencies.
- `uploads/`: Temporary storage for user-uploaded media before processing.

## 🛡️ How It Works

1. **Media Ingestion**: Users upload a video or image via the web interface.
2. **Backend Processing**: The Node.js server saves the file to the `uploads/` directory and invokes the Python detection script.
3. **Artifact Detection**: The Python script uses YOLOv8 to isolate facial regions and analyze them for unnatural blending or artifacts.
4. **Verdict Generation**: The script outputs the probability of the media being Fake or Real, and the Node.js server sends this verdict back to the frontend to be displayed to the user.

## 📄 License

This project is licensed under the ISC License.
