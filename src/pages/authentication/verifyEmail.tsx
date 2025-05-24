function VerifyEmail() {
  return <div>
    <h1>Verify Email</h1>
    <p>Please check your email for a verification link.</p>
    {/* Add form for email input and submit button */}
    <form>
      <input type="email" placeholder="Enter your email" required />
      <button type="submit">Send Verification Link</button>
    </form>
    <p>If you didn't receive the email, <a href="#">click here</a> to resend.</p>
  </div>;
}
export default VerifyEmail;