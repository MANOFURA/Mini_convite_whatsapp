
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import sqlite3
from pathlib import Path

BASE = Path(__file__).resolve().parent
DB = BASE / "convite.db"
FRONTEND = BASE.parent / "frontend"

app = Flask(__name__)
CORS(app)

def get_db():
    conn = sqlite3.connect(DB)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS encontros (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            data TEXT NOT NULL,
            hora TEXT NOT NULL,
            local TEXT NOT NULL,
            mensagem TEXT DEFAULT '',
            criado_em TEXT DEFAULT CURRENT_TIMESTAMP
        )
    """)
    # Cria um convite inicial somente na primeira execução.
    if conn.execute("SELECT COUNT(*) FROM encontros").fetchone()[0] == 0:
        conn.execute(
            "INSERT INTO encontros (data, hora, local, mensagem) VALUES (?, ?, ?, ?)",
            ("", "", "", "Tenho uma proposta especial para você. ❤️")
        )
    conn.commit()
    conn.close()

@app.get("/api/encontro")
def obter_encontro():
    conn = get_db()
    row = conn.execute("SELECT * FROM encontros ORDER BY id DESC LIMIT 1").fetchone()
    conn.close()
    return jsonify(dict(row))

@app.put("/api/encontro")
def atualizar_encontro():
    dados = request.get_json(silent=True) or {}
    data = str(dados.get("data", "")).strip()
    hora = str(dados.get("hora", "")).strip()
    local = str(dados.get("local", "")).strip()
    mensagem = str(dados.get("mensagem", "")).strip()

    if not data or not hora or not local:
        return jsonify({"erro": "Data, horário e local são obrigatórios."}), 400

    conn = get_db()
    row = conn.execute("SELECT id FROM encontros ORDER BY id DESC LIMIT 1").fetchone()

    if row:
        conn.execute("""
            UPDATE encontros
            SET data = ?, hora = ?, local = ?, mensagem = ?
            WHERE id = ?
        """, (data, hora, local, mensagem, row["id"]))
    else:
        conn.execute("""
            INSERT INTO encontros (data, hora, local, mensagem)
            VALUES (?, ?, ?, ?)
        """, (data, hora, local, mensagem))

    conn.commit()
    saved = conn.execute("SELECT * FROM encontros ORDER BY id DESC LIMIT 1").fetchone()
    conn.close()
    return jsonify(dict(saved))

@app.get("/")
def home():
    return send_from_directory(FRONTEND, "index.html")

@app.get("/<path:path>")
def frontend(path):
    return send_from_directory(FRONTEND, path)

if __name__ == "__main__":
    init_db()
    print("Servidor iniciado em http://127.0.0.1:5000")
    app.run(debug=True)
