export default function ContactInfoSection({ email = '', phone = '' }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-sm">
      <h2 className="text-lg font-bold mb-4">Contact Info</h2>
      <p>
        <span className="font-medium">Email Address: </span>
        {email}
      </p>
      <p>
        <span className="font-medium">Phone Number:</span>
        {phone}
      </p>
    </div>
  );
}
