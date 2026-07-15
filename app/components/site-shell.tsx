import Link from "next/link";

type ActivePage = "home" | "about" | "research" | "teaching";

const navItems: Array<{ href: string; label: string; key: ActivePage }> = [
  { href: "/about", label: "About", key: "about" },
  { href: "/research", label: "Research", key: "research" },
  { href: "/teaching", label: "Teaching", key: "teaching" },
];

export function SiteHeader({ active }: { active: ActivePage }) {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Zheng Zhu, home">
        <span>Zheng Zhu</span>
        <span className="wordmark-cn" lang="zh-Hans">朱政</span>
      </Link>
      <nav className="site-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <Link
            key={item.key}
            className={active === item.key ? "active" : undefined}
            href={item.href}
            aria-current={active === item.key ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <p className="footer-name">Zheng Zhu <span lang="zh-Hans">朱政</span></p>
        <p>PIMS Postdoctoral Fellow · University of Calgary</p>
      </div>
      <a href="mailto:zheng.zhu2@ucalgary.ca">zheng.zhu2@ucalgary.ca</a>
      <p>Calgary, Alberta</p>
    </footer>
  );
}
