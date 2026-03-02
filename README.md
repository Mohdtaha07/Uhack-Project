from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, grader
from app.db.session import init_db

app = FastAPI(title="Grader API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # restrict in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(grader.router, prefix="/grader", tags=["grader"])

@app.on_event("startup")
async def on_startup():
    await init_db()