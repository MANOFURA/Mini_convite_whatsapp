
# 💌 Convite para Encontro — Full Stack

Agora o projeto possui frontend + backend + banco SQLite.

## Estrutura

```text
convite-encontro-backend/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── README.md
└── frontend/
    ├── index.html
    ├── detalhes.html
    ├── confirmacao.html
    ├── configuracao.html
    ├── css/style.css
    └── js/
        ├── script.js
        ├── detalhes.js
        ├── confirmacao.js
        └── configuracao.js
```

## Executar no Windows

Abra o PowerShell dentro de `backend`:

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```

Abra:

http://127.0.0.1:5000

## Configurar data, horário e local

Abra:

http://127.0.0.1:5000/configuracao.html

Preencha:

- Data
- Horário
- Local
- Mensagem

Clique em **Salvar encontro**.

Os dados são persistidos em `backend/convite.db`.

## API

`GET /api/encontro` — consulta o encontro.

`PUT /api/encontro` — atualiza data, horário, local e mensagem.

## Fluxo

```text
Configuração
     ↓
Backend Flask
     ↓
SQLite
     ↓
Página de detalhes
     ↓
Pessoa aceita ❤️
     ↓
Confirmação
```
