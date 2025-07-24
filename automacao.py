from selenium import webdriver
from os import getenv
from dotenv import load_dotenv
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import json
load_dotenv()

# Dados de login
EMAIL = getenv("EMAIL")
SENHA = getenv("SENHA")

# Setup do navegador
options = Options()
options.add_argument("--start-maximized")
driver = webdriver.Chrome(options=options)

# Acessa o site da Alura
driver.get("https://cursos.alura.com.br/loginForm")

# Preenche o login
driver.find_element(By.ID, "login-email").send_keys(EMAIL)
driver.find_element(By.ID, "password").send_keys(SENHA)
driver.find_element(By.ID, "password").send_keys(Keys.RETURN)

# Espera carregar
time.sleep(5)

# Vai para a página de certificados
driver.get("https://cursos.alura.com.br/user/diasm-estudos")
time.sleep(5)

# Clica no botão para mostrar todas as formações concluídas
try:
    botao_ver_todas = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.CLASS_NAME, "seeMoreButton"))
    )
    botao_ver_todas.click()
    time.sleep(2)  # aguarda carregar os novos cards
except:
    pass  # se não encontrar o botão, segue normalmente

# Coleta os dados dos certificados de formações
certificados = []
cards = driver.find_elements(By.CLASS_NAME, "lightCard-title")
for card in cards:
    titulo = card.text
    parent = card.find_element(By.XPATH, "../..")
    try:
        link = parent.find_element(By.CLASS_NAME, "lightCard-otherLinks-certificate").get_attribute("href")
    except:
        link = None
    certificados.append({
        "titulo": titulo,
        "url_certificado": link,
        "descricao": f"Certificado obtido na plataforma Alura",
        "plataforma": "Alura"
    })

# Coleta os certificados dos cursos concluídos
curso_cards = driver.find_elements(By.CSS_SELECTOR, "a.course-card__certificate.bootcamp-text-color")
for curso in curso_cards:
    # Sobe para o elemento <li> que tem o nome do curso
    li_parent = curso.find_element(By.XPATH, "ancestor::li[contains(@class, 'card-list__item')]")
    nome = li_parent.get_attribute("data-course-name")
    link = curso.get_attribute("href")
    certificados.append({
        "titulo": nome,
        "url_certificado": link,
        "descricao": f"Certificado de curso concluído na plataforma Alura",
        "plataforma": "Alura"
    })

# Salva no JSON
with open("certificados.json", "w", encoding="utf-8") as f:
    json.dump(certificados, f, indent=2, ensure_ascii=False)

print("✅ Certificados extraídos com sucesso!")

driver.quit()
