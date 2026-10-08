import React from 'react';
import { Star } from 'lucide-react';

const Testimonial = () => {
    const testimonials = [
        {
            rating: 5,
            quote: `"Moving to New York without knowing anyone was terrifying. Nestora matched me with two PhD students whose cleaning habits and sleep schedules matched mine perfectly. It feels like home, not a compromise."`,
            name: "Elena Vance",
            role: "Resident in Brooklyn, NY",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
        },
        {
            rating: 5,
            quote: `"As an owner of three brownstone apartments, Nestora handles resident vetting and split rent disbursement flawlessly. I get my rental income deposited on the 1st without chasing four separate roommates."`,
            name: "Marcus Thorne",
            role: "Property Host in Austin, TX",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
        },
        {
            rating: 5,
            quote: `"The digital escrow protection gave me complete peace of mind. Getting my security deposit returned instantly after my digital check-out video was unlike any rental experience I've had in 7 years."`,
            name: "Siddharth Rao",
            role: "Resident in San Francisco, CA",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
        }
    ];

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                    VERIFIED TESTIMONIALS
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-1">
                    Loved by Residents and Property Owners
                </h2>
            </div>

            {/* Testimonials Grid (Responsive for all screens) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((item, index) => (
                    <div 
                        key={index}
                        className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
                    >
                        <div>
                            {/* Star Rating */}
                            <div className="flex items-center gap-1 mb-4 text-amber-400">
                                {[...Array(item.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                ))}
                            </div>

                            {/* Quote Text */}
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic font-medium">
                                {item.quote}
                            </p>
                        </div>

                        {/* Author Info */}
                        <div className="flex items-center gap-3 mt-8 pt-4 border-t border-slate-50">
                            <img 
                                src={item.avatar} 
                                alt={item.name} 
                                className="w-10 h-10 rounded-full object-cover border border-slate-200"
                            />
                            <div>
                                <h3 className="text-sm font-bold text-slate-900 leading-tight">
                                    {item.name}
                                </h3>
                                <p className="text-[11px] text-slate-500 mt-0.5">
                                    {item.role}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonial;