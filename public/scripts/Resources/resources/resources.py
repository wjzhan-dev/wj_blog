from edtrace import text, image, link, space


def main():
    text("# Current Reading")

    text("## Books")
    text("- **The Pragmatic Programmer** by David Thomas & Andrew Hunt")
    text("- **Designing Data-Intensive Applications** by Martin Kleppmann")
    text("- **A Philosophy of Software Design** by John Ousterhout")

    text("## Papers & Articles")
    text("- **Attention Is All You Need** — Vaswani et al.")
    text("- **Deep Learning for Symbolic Mathematics** — Lample & Charton")

    text("## Newsletters & Blogs")
    text("- **Hacker Newsletter** — Weekly curated tech news")
    text("- **The Pragmatic Engineer** — Deep dives on software engineering at scale")


if __name__ == "__main__":
    main()
