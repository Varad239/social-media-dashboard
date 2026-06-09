import MetricCard from "../components/MetricCard";

function Dashboard() {
  const metrics = [
    {
      title: "Followers",
      value: 1250
    },
    {
      title: "Likes",
      value: 450
    },
    {
      title: "Comments",
      value: 120
    },
    {
      title: "Shares",
      value: 80
    }
  ];

  return (
    <div className="container">
      <h1>
        Dashboard
      </h1>

      <div className="grid">
        {metrics.map(
          (metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
            />
          )
        )}
      </div>
    </div>
  );
}

export default Dashboard;