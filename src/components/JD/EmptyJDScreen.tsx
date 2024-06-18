import EmptyJDInsights from "./EmptyJDInsights";
import EmptyJDdescriptions from "./EmptyJDdescriptions";

const EmptyJDScreen = () => {
  return (
    <div id="empty-jd-screen">
      <main>
        <div className="grid grid-cols-4 h-screen gap-2">
          <div className="col-span-3">
            <EmptyJDdescriptions />
          </div>

          <div>
            <EmptyJDInsights />
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmptyJDScreen;
