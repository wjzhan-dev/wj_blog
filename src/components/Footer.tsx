export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} wjzhan-dev. All rights reserved.</p>
        <p>Built with care. Hosted on GitHub Pages.</p>
      </div>
    </footer>
  );
}
