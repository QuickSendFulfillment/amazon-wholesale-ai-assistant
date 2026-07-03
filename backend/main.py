from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Any, Dict
from agents.brand_agent import BrandAgent
app = FastAPI(title="QuickSend AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def health_check():
    return {
        "status": "online",
        "message": "QuickSend AI backend is running"
    }


@app.post("/mission")
def create_mission(mission: Dict[str, Any]):
    mission_type = mission.get("missionType", "unknown")
    country = mission.get("country", "Unknown")
    product = mission.get("product", {})
    brand = product.get("brand", "Unknown brand")

    return {
        "status": "accepted",
        "message": f"Mission received: {mission_type} for {brand} in {country}. AI agent workflow will be connected next."
    }


@app.post("/brand-intelligence")
def brand_intelligence(data: Dict[str, Any]):
    agent = BrandAgent()
    return agent.analyze(data)

    return {
        "status": "success",
        "agent": "Brand Intelligence Agent",
        "brand": brand,
        "country": country,
        "mission_status": "Mission Started",
        "research_plan": [
            {
                "step": 1,
                "task": "Find official brand website"
            },
            {
                "step": 2,
                "task": "Find wholesale page"
            },
            {
                "step": 3,
                "task": "Find dealer application"
            },
            {
                "step": 4,
                "task": "Find distributor locator"
            },
            {
                "step": 5,
                "task": "Find contact email"
            },
            {
                "step": 6,
                "task": f"Search authorized distributors in {country}"
            }
        ]
    }