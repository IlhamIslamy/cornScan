import React from 'react';
import { BadgeCheck } from 'lucide-react';

const TeamCard = ({ photo, name, role, institution }) => {
    return (
        <div className="bg-white rounded-2xl border-2 border-gray py-12 flex flex-col items-center text-center hover:shadow-lg transition">
            <img
                src={photo}
                alt={name}
                className="w-48 h-48 rounded-full object-cover mb-4"
            />
            <h3 className="text-2xl font-semibold">{name}</h3>
            <div className="text-xl text-gray-600 flex items-center gap-1">
                <BadgeCheck className="w-5 h-5 text-green-500" />
                <span>{role}</span>
            </div>
            <p className="text-lg text-gray-500 mt-1">{institution}</p>
        </div>
    );
};

export default TeamCard;
