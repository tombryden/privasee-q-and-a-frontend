import Container from "@/components/container";
import MainTable from "@/components/pages/home/main-table/main-table";

export default function Home() {
  return (
    <Container>
      <h1 className="text-5xl mt-10 mb-10">Q&As</h1>
      <MainTable />
    </Container>
  );
}
