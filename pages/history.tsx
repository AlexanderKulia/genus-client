import { GetStaticProps } from "next";

interface HistoryProps {
  protected: boolean;
}

const History = () => {
  return <div>History</div>;
};

export const getStaticProps: GetStaticProps<HistoryProps> = () => {
  return {
    props: {
      protected: true,
    },
  };
};

export default History;
