export function Footer() {
    return (
        <footer className="bg-slate-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                            Silvin Lanka
                        </span>
                        <p className="mt-4 text-slate-400 max-w-sm">
                            Discover the beauty of Sri Lanka with our curated tours and expert guides. Unforgettable experiences await.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-slate-400">
                            <li><a href="/tours" className="hover:text-blue-400 transition-colors">Our Tours</a></li>
                            <li><a href="/gallery" className="hover:text-blue-400 transition-colors">Gallery</a></li>
                            <li><a href="/about" className="hover:text-blue-400 transition-colors">About Us</a></li>
                            <li><a href="/contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
                            <li><a href="/reviews" className="hover:text-blue-400 transition-colors">Reviews</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <ul className="space-y-2 text-slate-400">
                            <li>Email: info@silvinlanka.com</li>
                            <li>Phone: +94 77 123 4567</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500 text-sm">
                    &copy; {new Date().getFullYear()} Silvin Lanka. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
