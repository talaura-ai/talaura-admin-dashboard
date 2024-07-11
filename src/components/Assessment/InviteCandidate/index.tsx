import AddCandidates from './AddCandidates';
import AddedCandidatesTable from './AddedCandidatesTable';
import Footer from './Footer';
import Header from './Header';

const InviteCandidate = () => {
  return (
    <section className="flex-1 bg-floralwhite flex flex-col items-start justify-start box-border gap-4 text-center text-[1.25rem] text-customGray-100 font-sansation lg:pl-[1.625rem] lg:pr-[1.563rem] lg:box-border ] mq750:pt-[1.25rem] mq750:box-border mq1050:pt-[1.688rem] mq1050:pb-[1.25rem] mq1050:box-border">
      <Header />
      <AddCandidates />
      <AddedCandidatesTable />
      <Footer />
    </section>
  );
};

export default InviteCandidate;
