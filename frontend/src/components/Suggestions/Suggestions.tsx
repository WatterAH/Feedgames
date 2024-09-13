import { useSuggestions } from "../../hooks/useSuggestions";
import PageLoader from "../Global/PageLoader";
import ProfileSuggestion from "./ProfileSuggestion";

const Suggestions = () => {
  const { users, loading, error } = useSuggestions();

  return (
    <main className="w-64 hidden lg:block fixed border-t border-l right-0 top-0 px-3 z-20 py-6 h-full bg-white">
      <header>
        <h1 className="text-xl font-semibold">Sugerencias para ti</h1>
      </header>
      {loading && (
        <div className="mt-3">
          <PageLoader />
        </div>
      )}
      {!loading && !error && (
        <div className="flex flex-col py-3">
          {users.map((user) => (
            <ProfileSuggestion data={user} key={user.id} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Suggestions;
