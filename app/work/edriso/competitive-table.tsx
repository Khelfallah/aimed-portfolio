'use client';

import { useMemo, useState } from 'react';
import { BookOpen, FileText, GraduationCap, Lightbulb, List, Users, type LucideIcon } from 'lucide-react';
import styles from './case-study.module.css';

type CompetitiveTableProps = {
  rows: string[][];
};

const headerIcons: Record<string, LucideIcon> = {
  Area: List,
  'Ency‑Education': GraduationCap,
  DZExams: FileText,
  Eddriassa: BookOpen,
  Opportunity: Lightbulb,
  'Existing Experience': Users,
};

export function CompetitiveTable({ rows }: CompetitiveTableProps) {
  const [sortColumn, setSortColumn] = useState<number | null>(null);
  const [sortDirection, setSortDirection] = useState<'ascending' | 'descending'>('ascending');
  const [query, setQuery] = useState('');
  const [headers, ...body] = rows;

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const matchingRows = normalizedQuery
      ? body.filter((row) => row.some((cell) => cell.toLowerCase().includes(normalizedQuery)))
      : body;

    if (sortColumn === null) return matchingRows;

    return [...matchingRows].sort((left, right) => {
      const leftValue = left[sortColumn] ?? '';
      const rightValue = right[sortColumn] ?? '';
      const leftNumber = Number(leftValue.replace(/[^0-9.]/g, ''));
      const rightNumber = Number(rightValue.replace(/[^0-9.]/g, ''));
      const comparison = Number.isNaN(leftNumber) || Number.isNaN(rightNumber)
        ? leftValue.localeCompare(rightValue)
        : leftNumber - rightNumber;
      return sortDirection === 'ascending' ? comparison : -comparison;
    });
  }, [body, query, sortColumn, sortDirection]);

  const toggleSort = (column: number) => {
    if (sortColumn === column) {
      setSortDirection((direction) => direction === 'ascending' ? 'descending' : 'ascending');
    } else {
      setSortColumn(column);
      setSortDirection('ascending');
    }
  };

  return (
    // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- Keyboard users need to scroll the wide comparison table.
    <section className={styles.tableScroll} aria-label="Competitive comparison" tabIndex={0}>
      <div className={styles.tableToolbar}>
        <label htmlFor="competitive-table-search">Filter competitors</label>
        <input
          id="competitive-table-search"
          className={styles.tableSearch}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Filter rows"
        />
      </div>
      <table>
        <caption>Competitive patterns. Select a column header to sort.</caption>
        <thead>
          <tr>{headers.map((cell, index) => {
            const isSorted = sortColumn === index;
            const isOpportunity = cell === 'Opportunity';
            const HeaderIcon = headerIcons[cell] ?? List;
            return (
              <th key={cell} className={isOpportunity ? styles.tableOpportunity : undefined} scope="col" aria-sort={isSorted ? sortDirection : 'none'}>
                <button type="button" className={styles.tableHeaderButton} onClick={() => toggleSort(index)} aria-label={`Sort by ${cell}`}>
                  <span className={styles.tableHeaderIcon} aria-hidden="true"><HeaderIcon size={20} strokeWidth={2.2} /></span>
                  <span>{cell}</span>
                  <span className={styles.tableSortIndicator} aria-hidden="true">{isSorted ? (sortDirection === 'ascending' ? ' ↑' : ' ↓') : ' ↕'}</span>
                </button>
              </th>
            );
          })}</tr>
        </thead>
        <tbody>
          {filteredRows.map((row) => (
            <tr key={row.join('|')}>{row.map((cell, column) => {
              const isOpportunity = headers[column] === 'Opportunity';
              const className = isOpportunity ? styles.tableOpportunity : undefined;
              return column === 0
                ? <th key={column} className={className} scope="row">{cell}</th>
                : <td key={column} className={className}>{cell}</td>;
            })}</tr>
          ))}
        </tbody>
      </table>
      {filteredRows.length === 0 && <p className={styles.tableEmpty}>No competitors match that filter.</p>}
    </section>
  );
}
