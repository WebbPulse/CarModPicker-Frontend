function VerifyEmailConfirm() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
        <p className="text-gray-600 mb-6">
          Please check your email for a verification link. Click the link to
          confirm your email address.
        </p>
        <button
          onClick={() => (window.location.href = '/login')}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}
export default VerifyEmailConfirm;
