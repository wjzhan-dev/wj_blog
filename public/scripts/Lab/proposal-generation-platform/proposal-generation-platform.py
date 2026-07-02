import os
from edtrace import text, image, link, space


ARCHIVE_STATUS = "Deployed"
DEPLOYED_URL = "https://proposal-gen-app-nine.vercel.app/"
GITHUB_REPO = "https://github.com/wjzhan-dev/proposal_gen_app"


def intro():
    text("This experimental project was built to test a cutting-edge **Design-to-Code** workflow using **Claude Code**. It delivers a streamlined, asynchronous full-stack **SaaS platform** that automates the entire B2B sales pipeline from a raw text description to a beautifully templated proposal, all the way to final checkout and secure payment.")
    space()


def main():
    text("## The Core Initiative:")
    text("Beyond delivering a client-facing utility, this project aims to deeply understand and familiarize myself with **agentic AI coding frameworks**, establishing a baseline blueprint for modern, AI-driven software production")

    text("## The Tech Stack & Workflow:")
    text("The core architecture and development workflow built entirely by AI orchestration:")
    text("- **Core AI Engine**: DeepSeek V4 Pro (orchestrated via an OpenAI-compatible endpoint).")
    text("- **Frontend & Backend**: Next.js 14 (App Router) and Tailwind CSS, hosted on Vercel.")
    text("- **Database & Auth**: Supabase (PostgreSQL) with Row-Level Security.")
    text("- **Monetization**: Stripe integration.")
    text("- **Development**: 100% developed and deployed through interactive prompts via the **Claude Code CLI**.")
    image("./image1.jpg", width=700)


if __name__ == "__main__":
    main()
