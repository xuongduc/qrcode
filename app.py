from flask import Flask, request, jsonify
from flask_cors import CORS
import qrcode
import os

app = Flask(__name__)
CORS(app)


@app.route('/generate_qr', methods=['POST'])
def generate_qr():
    data = request.json
    link = data.get("link")
    filename = data.get("filename", "qr_code.png")
    print("Payload received:", request.json)
    if not link:
        return jsonify({"error": "Link is required"}), 400
    
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=5,
    )
    qr.add_data(link)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    img.save(filename)
    
    return jsonify({"message": "QR code created successfully", "filename": filename})


@app.route('/delete_file', methods=['DELETE'])
def delete_file():
    data = request.json
    filename = data.get("filename")
    file_path = os.path.join('.', filename)
    os.remove(file_path)
    return jsonify({"message": f"File '{filename}' deleted successfully"}), 200
    
app.run(debug=True)
