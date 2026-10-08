import React from 'react';
import { UserCheck, Split, Landmark, Wrench } from 'lucide-react';

const Choose = () => {
    const features = [
        {
            icon: UserCheck,
            title: "Verified Identities",
            description: "Every flatmate and property owner passes bank-grade biometric ID verification and nationwide background checks."
        },
        {
            icon: Split,
            title: "Automated Rent Splitting",
            description: "Pay only your designated room share. If a flatmate is tardy, our reserve policy guarantees zero default penalties on your credit."
        },
        {
            icon: Landmark,
            title: "Escrow Security Deposits",
            description: "Deposits are held in third-party FDIC insured escrow vaults, released back automatically upon verified move-out inspection."
        },
        {
            icon: Wrench,
            title: "24/7 Digital Maintenance",
            description: "Tap the app for plumbing, HVAC, or lock repairs with pre-vetted contractors dispatched in under 90 minutes."
        }
    ];

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div className="max-w-xl">
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                        THE NESTORA STANDARD
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-1">
                        Why Modern Renters Choose Nestora
                    </h2>
                </div>
                
                <p className="text-slate-500 text-xs sm:text-sm font-medium max-w-md leading-relaxed">
                    We rebuilt shared residential leasing from scratch to remove vulnerability, awkward IOUs, and landlord mistrust.
                </p>
            </div>

            {/* Feature Cards Grid (Responsive 1 -> 2 -> 4 Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                        <div 
                            key={index} 
                            className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col justify-start"
                        >
                            {/* Icon Container */}
                            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-6 shrink-0">
                                <IconComponent className="w-6 h-6" />
                            </div>

                            {/* Card Content */}
                            <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug">
                                {feature.title}
                            </h3>
                            
                            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                                {feature.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Choose;

