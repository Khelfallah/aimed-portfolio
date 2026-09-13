'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  BookOpen, Target, ContactRound, Route, Search, Quote, ListFilter,
  Network, Sparkles, ClipboardCheck, Code2, Telescope, GraduationCap,
} from 'lucide-react';
import {
  Sidebar, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider,
} from '@/components/ui/sidebar';
import styles from './case-study.module.css';

const icons = [
  BookOpen, Target, ContactRound, Route, Search, Quote, ListFilter,
  Network, Sparkles, ClipboardCheck, Code2, Telescope, GraduationCap,
];

type ChapterLink = { id: string; label: string };

export function CaseStudyLayout({ chapters, children }: {
  chapters: ChapterLink[];
  children: ReactNode;
}) {
  const [active, setActive] = useState(chapters[0].id);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sections = chapters.map(({ id }) => document.getElementById(id));
    let frame = 0;
    const updateActiveSection = () => {
      frame = 0;
      const readingLine = window.innerWidth <= 900 ? 150 : window.innerHeight * 0.25;
      let current = chapters[0].id;
      sections.forEach((section, index) => {
        if (section && section.getBoundingClientRect().top <= readingLine) {
          current = chapters[index].id;
        }
      });
      setActive(current);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    };
    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('hashchange', scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.removeEventListener('hashchange', scheduleUpdate);
    };
  }, [chapters]);

  useEffect(() => {
    const menu = menuRef.current;
    const link = menu?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!menu || !link) return;
    // Keep the active item visible without moving the document or keyboard focus.
    const menuBox = menu.getBoundingClientRect();
    const linkBox = link.getBoundingClientRect();
    if (window.innerWidth <= 900) {
      menu.scrollLeft += linkBox.left - menuBox.left - (menuBox.width - linkBox.width) / 2;
    } else if (linkBox.bottom > menuBox.bottom) {
      menu.scrollTop += linkBox.bottom - menuBox.bottom;
    } else if (linkBox.top < menuBox.top) {
      menu.scrollTop -= menuBox.top - linkBox.top;
    }
  }, [active]);

  return (
    <div className={styles.surface}>
      <SidebarProvider className={styles.layout}>
        <Sidebar collapsible="none" className={styles.sidebar}>
          <nav ref={menuRef} className={styles.navigation} aria-label="Edriso case study sections">
            <SidebarMenu className={styles.menu}>
              {chapters.map(({ id, label }, index) => {
                const Icon = icons[index] ?? BookOpen;
                return (
                  <SidebarMenuItem key={id}>
                    <SidebarMenuButton
                      className={styles.link}
                      isActive={active === id}
                      render={<a href={`#${id}`} aria-label={label} aria-current={active === id ? 'location' : undefined} />}
                    >
                      <Icon aria-hidden="true" />
                      <span>{label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </nav>
        </Sidebar>
        <div className={styles.content}>{children}</div>
      </SidebarProvider>
    </div>
  );
}
