import Graph from "./graph";

export default function Home({ sleeps }) {
  return (
    <div>
      <Graph />
      <p>ouraring test</p>
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

  const userInfo = await client.getUserInfo();
  console.log(`The call returned: ${JSON.stringify(userInfo)}`);

  const sleeps = await client.getReadinessSummaries({
    start: "2019-01-15",
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
