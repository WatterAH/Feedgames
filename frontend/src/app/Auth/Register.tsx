import Header from "../../components/Auth/Header";

const Register = () => {
  return (
    <>
      <main className="flex flex-1 min-h-full flex-col justify-center h-screen px-6 py-12 sm:bg-gray-100">
        <div className="flex flex-col items-center shadow-transparent justify-center bg-white sm:shadow-xl rounded-xl sm:mx-auto sm:max-w-sm sm:w-full">
          <form className="flex flex-col gap-y-5 sm:mx-auto w-full sm:max-w-sm px-2 sm:px-9 py-4 sm:py-12">
            <Header />
          </form>
        </div>
      </main>
    </>
  );
};

export default Register;
