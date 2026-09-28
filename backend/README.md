
# Backend

## Instalação

No terminal, entre na pasta `backend`:

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```

Depois abra:

http://127.0.0.1:5000

O banco SQLite `convite.db` é criado automaticamente.

## API

### Buscar encontro
`GET /api/encontro`

### Atualizar encontro
`PUT /api/encontro`

JSON:

```json
{
  "data": "2026-10-10",
  "hora": "19:30",
  "local": "Restaurante Exemplo",
  "mensagem": "Mal posso esperar ❤️"
}
```
