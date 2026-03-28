import { useState } from "react";
import members from "../members.json";
import styles from "../styles/_members.module.scss";
import type { Member } from "../types";
import { FaXmark } from "react-icons/fa6";

export default function DisplayMembers() {
  const departments = ["All", "Construction", "Programming", "Electronics"];
  const [selected, setSelected] = useState(0);
  const [curr, setCurr] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const filtered: Member[] =
    selected === 0 ? members : members.filter((m) => m.dept === selected - 1);

  const searched = search
    ? filtered.filter((m) =>
        m.name.toLowerCase().includes(search.toLowerCase()),
      )
    : filtered;

  const sorted = [...searched].sort((a, b) => {
    const rank = (m: Member) => (m.head ? 0 : m.role ? 1 : 2);

    const rankDiff = rank(a) - rank(b);
    if (rankDiff !== 0) return rankDiff;

    if (a.head && b.head) {
      const aPriority = a.priority ?? Infinity;
      const bPriority = b.priority ?? Infinity;
      if (aPriority !== bPriority) return aPriority - bPriority;
    }

    return a.name > b.name ? 1 : -1;
  });

  return (
    <div className={styles.container}>
      <div className={styles.selectorContainer}>
        {departments.map((department, i) => {
          const currCount =
            i == 0
              ? members.length
              : members.filter((m) => m.dept === i - 1).length;

          return (
            <div
              key={i}
              data-tap="1.1"
              className={`${styles.selector} ${selected == i && styles.activeSelection}`}
              onClick={() => setSelected(i)}
            >
              {`${department} (${currCount})`}
            </div>
          );
        })}
        <input
          className={styles.search}
          type="text"
          placeholder="Search members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className={styles.membersContainer}>
        {sorted.map((member, i) => {
          const isLeadership = member.head;
          const hasRole = member.role;

          return (
            <div
              key={i}
              className={`${styles.memberContainer} ${isLeadership && styles.isLeadership}`}
              onClick={() => setCurr(i)}
            >
              {(hasRole || isLeadership) && (
                <p className={styles.leadership}>
                  {member.head ?? member.role}
                </p>
              )}
              <img src={member.src}></img>
              <div className={styles.textContainer}>
                <h1 className={styles.memberName}>{member.name}</h1>
                <p className={styles.memberDesc}>{member.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {sorted.length <= 0 && (
        <div className="membersContainer">
          <h1>No members were found</h1>
        </div>
      )}

      {curr !== null && (
        <div className={styles.expandedMember} onClick={() => setCurr(null)}>
          <div className={styles.expandedCard}>
            <FaXmark
              className={styles.exitExpand}
              onClick={() => setCurr(null)}
            />
            <img src={sorted[curr].src} />
            <div className={styles.expandedText}>
              <h1 className={styles.expandedName}>{sorted[curr].name}</h1>
              <p className={styles.expandedRole}>
                {sorted[curr].head ?? sorted[curr].role}
              </p>
              <p className={styles.expandedDesc}>{sorted[curr].desc}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
