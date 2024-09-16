

const UnauthorizedPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold">403 Forbidden</h1>
        <p className="mt-4 text-xl">You do not have permission to access this page.</p>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
