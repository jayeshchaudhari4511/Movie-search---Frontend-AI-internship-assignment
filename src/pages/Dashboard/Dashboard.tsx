import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Card } from "../../components/ui";
import styles from "./Dashboard.module.css";

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <section className={styles.section}>
      <h1 className={styles.heading}>Dashboard</h1>
      <p className={styles.welcome}>
        Hello, <strong>{currentUser?.email}</strong> 👋
      </p>

      <div className={styles.grid}>
        <Card title="Users" subtitle="Registered accounts">
          <p className={styles.stat}>1,204</p>
        </Card>
        <Card title="Sessions" subtitle="Active today">
          <p className={styles.stat}>378</p>
        </Card>
        <Card title="Revenue" subtitle="This month">
          <p className={styles.stat}>$24,800</p>
        </Card>
      </div>
    </section>
  );
};

export default Dashboard;
