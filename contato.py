from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from os import getenv
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)

# Configurações de e-mail
EMAIL_FROM = getenv("EMAIL_FROM")
EMAIL_TO = getenv("EMAIL_TO")
EMAIL_PASS = getenv("EMAIL_PASS")
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587

print("FROM:", EMAIL_FROM)
print("TO:", EMAIL_TO)
print("PASS:", EMAIL_PASS[:3], "***")

@app.route("/contato", methods=["POST"])
def receber_contato():
    data = request.json
    nome = data.get("name")
    email = data.get("email")
    telefone = data.get("phone")
    mensagem = data.get("message")

    # E-mail para Letícia
    msg = MIMEMultipart()
    msg['From'] = EMAIL_FROM
    msg['To'] = EMAIL_TO
    msg['Subject'] = f"[Portfólio] Nova mensagem de {nome}"

    corpo = f"""
    <strong>Nome:</strong> {nome}<br>
    <strong>E-mail:</strong> {email}<br>
    <strong>Telefone:</strong> {telefone}<br><br>
    <strong>Mensagem:</strong><br>{mensagem}
    """

    msg.attach(MIMEText(corpo, 'html'))

    try:
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(EMAIL_FROM, EMAIL_PASS)

        # Envia para você
        server.send_message(msg)

        # Envia confirmação para o visitante
        confirmacao = MIMEMultipart()
        confirmacao['From'] = EMAIL_FROM
        confirmacao['To'] = email
        confirmacao['Subject'] = "Recebemos sua mensagem! 🚀"

        html = f"""
        <p>Olá <strong>{nome}</strong>,</p>
        <p>Recebemos sua mensagem com sucesso! Em breve, a Letícia entrará em contato com você.</p>
        <p><em>Mensagem enviada:</em></p>
        <blockquote>{mensagem}</blockquote>
        <p>Obrigada pelo contato!<br><strong>Letícia Dias</strong></p>
        """

        confirmacao.attach(MIMEText(html, 'html'))
        server.send_message(confirmacao)

        server.quit()
        return jsonify({"mensagem": "Mensagem enviada com sucesso!"}), 200

    except Exception as e:
        print("Erro ao enviar:", e)
        return jsonify({"erro": "Falha ao enviar o e-mail."}), 500

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 10000))  # ou 8080 se preferir
    app.run(host='0.0.0.0', port=port)

