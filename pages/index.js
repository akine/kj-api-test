import Graph from "./graph";

export default function Home({ sleeps }) {
  return (
    <div>
      <Graph />
      <p>小城の1週間の睡眠状態</p>
      <p>ouraring readinessの数値</p>
      {sleeps.map((sleep, index) => (
        <div key={index}>
          <h1>{sleep.summary_date}</h1>
          <p>{sleep.score}</p>
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const Client = require("oura-cloud-api");
  const accessToken = process.env.ACCESS_TOKEN;
  const client = new Client(accessToken);
  const today = new Date();
  const pastDate = today.getDate() - 7;

  const userInfo = await client.getUserInfo();
  console.log(`The call returned: ${JSON.stringify(userInfo)}`);

  const sleeps = await client.getReadinessSummaries({
    start: today.setDate(pastDate),
    end: today,
  });
  console.log(`The call returned: ${JSON.stringify(sleeps)}`);

  return {
    props: {
      sleeps,
    },
    // 1時間毎に更新
    revalidate: 3600,
  };
}
