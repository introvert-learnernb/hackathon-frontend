import Link from "next/link";

export default function Disclaimer() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 text-gray-800 py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-6 text-center">
            Disclaimer
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            The information provided on the <strong className="text-primary">Connect किसान</strong>{" "}
            platform is for general informational purposes only. While we strive
            to ensure the accuracy and reliability of the information presented,
            we make no guarantees of any kind, express or implied, regarding the
            completeness, accuracy, reliability, suitability, or availability
            concerning the platform or the information, products, services, or
            related graphics contained on the platform for any purpose.
          </p>

          <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">
            No Professional Advice
          </h2>
          <p className="text-gray-600 leading-7">
            The content on this platform should not be considered as
            professional, legal, agricultural, or financial advice. Any reliance
            you place on the information provided is strictly at your own risk.
            We recommend consulting with relevant professionals before making
            any decisions based on the information provided.
          </p>

          <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">
            Third-Party Content
          </h2>
          <p className="text-gray-600 leading-7">
            Our platform may contain links to third-party websites or services
            that are not owned or controlled by <strong className="text-primary">Connect किसान</strong>.
            We do not have control over the content, privacy policies, or
            practices of any third-party websites or services. Therefore, we are
            not responsible for the content or reliability of any such external
            sites.
          </p>

          <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">
            Limitation of Liability
          </h2>
          <p className="text-gray-600 leading-7">
            Under no circumstances shall <strong className="text-primary">Connect किसान</strong>, its
            affiliates, or partners be held liable for any loss or damage,
            including without limitation, indirect or consequential loss or
            damage, or any loss or damage whatsoever arising from loss of data
            or profits, arising out of or in connection with the use of this
            platform.
          </p>

          <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">
            Updates and Changes
          </h2>
          <p className="text-gray-600 leading-7">
            We reserve the right to modify or update this disclaimer at any
            time. It is your responsibility to review this disclaimer
            periodically for changes. Your continued use of the platform
            following the posting of changes indicates your acceptance of those
            changes.
          </p>

          <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-600 leading-7">
            If you have any questions or concerns regarding this disclaimer,
            please feel free to contact us at
            <Link
              href="mailto:support@connectkisan.com"
              className="text-primary underline ml-2"
            >
              support@connectkisan.com
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
}
