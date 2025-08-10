from flask import Flask, jsonify ,send_file,request
from flask_cors import CORS
import mysql.connector
import qrcode
import io
app = Flask(__name__)
CORS(app)

db = mysql.connector.connect(host="localhost",user="root",password="Hari@5432",database ="fooddb")
cursor = db.cursor(dictionary = True)
@app.route("/")
def home():
    return "welcome to food app  here you can try indian and japanese foods"




@app.route("/api/foods", methods=['GET'])
def get_foods():
    cursor.execute("select * from foods")
    foods = cursor.fetchall()
    return jsonify(foods)
@app.route("/create-order",methods=['GET','POST'])
def orders():
    data = request.json
    amount = data.get("amount")  # Total from React cart
    upi_id = "seelaboinaharicharan@okaxis"
    name = "Your Name"

    # Create UPI payment URL
    upi_url = f"upi://pay?pa={upi_id}&pn={name}&am={amount}&cu=INR"

    # Generate QR Code
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(upi_url)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")

    # Save QR code to memory
    buffer = io.BytesIO()
    img.save(buffer, format="PNG")
    buffer.seek(0)

    return send_file(buffer, mimetype="image/png")

   

if __name__ == '__main__':
    app.run(debug=True)