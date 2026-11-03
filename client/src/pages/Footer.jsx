const Footer = () => {
  return (
    <footer className="bg-green-900 text-green-100">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">

        {/* Brand */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-800 text-xl">
              🌱
            </span>
            <span className="text-2xl font-bold text-white">FarmMart</span>
          </div>
          <p className="text-sm leading-relaxed text-green-200">
            Kisan aur customer ke beech seedha rishta. Taaza fasal, sahi daam.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2.5">
          <h4 className="mb-1 text-base font-semibold text-white">Quick Links</h4>
          <a href="#" className="text-sm text-green-200 hover:text-white">Home</a>
          <a href="#" className="text-sm text-green-200 hover:text-white">Products</a>
          <a href="#" className="text-sm text-green-200 hover:text-white">Categories</a>
          <a href="#" className="text-sm text-green-200 hover:text-white">About</a>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-2.5">
          <h4 className="mb-1 text-base font-semibold text-white">Categories</h4>
          <a href="#" className="text-sm text-green-200 hover:text-white">Sabzian</a>
          <a href="#" className="text-sm text-green-200 hover:text-white">Phal</a>
          <a href="#" className="text-sm text-green-200 hover:text-white">Anaaj</a>
          <a href="#" className="text-sm text-green-200 hover:text-white">Dairy</a>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-2.5">
          <h4 className="mb-1 text-base font-semibold text-white">Contact</h4>
          <p className="text-sm text-green-200">📍 Karachi, Pakistan</p>
          <p className="text-sm text-green-200">📞 +92 300 0000000</p>
          <p className="text-sm text-green-200">✉️ support@farmmart.com</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-green-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-4 text-sm text-green-200 sm:flex-row">
          <span>© 2026 FarmMart. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;