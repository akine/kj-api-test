import Graph from "./graph";

export default function Home({ readiness, sleeps }) {
  return (
    <>
      <div>
        <Graph />
        <p>小城の1週間の睡眠状態</p>
        <p>ouraring readinessの数値</p>
        {readiness.map((ready, index) => (
          <div key={index}>
            <h1>{ready.summary_date}</h1>
            <p>{ready.score}</p>
          </div>
        ))}
      </div>
      <div>
        レムノンレムのデータ
        {sleeps.map((sleep, index) => (
          <div key={index}>
            <p>レム: {sleep.score_rem}</p> 
            <p>ノンレム: {sleep.score_deep}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const Client = require("oura-cloud-api");
  const accessToken = process.env.ACCESS_TOKEN;
  const client = new Client(accessToken);
  const today = new Date();
  const pastDate = today.getDate() - 7;

  const userInfo = await client.getUserInfo();
  // console.log(`The call returned: ${JSON.stringify(userInfo)}`);

  const readiness = await client.getReadinessSummaries({
    start: today.setDate(pastDate),
    end: today,
  });
  // console.log(`The call returned: ${JSON.stringify(readiness)}`);

  const sleeps = await client.getSleepSummaries({
    start: today.setDate(pastDate),
    end: today,
  });
  // console.log(`The call returned: ${JSON.stringify(sleeps, null, 2)}`);

  return {
    props: {
      readiness,
      sleeps,
    },
    // 1時間毎に更新
    revalidate: 3600,
  };
}
