import React from 'react';
import TeamCard from "../components/Card";
const TeamSection = () => {
    const team = [
        {
            photo: '../assets/download.jpeg',
            name: 'Wahyu Bagas Prastyo',
            role: 'Machine Learning',
            institution: 'Politeknik Negeri Jember',
        },
        {
            photo: '../assets/download.jpeg',
            name: 'Siti Septiyah Agustin',
            role: 'Machine Learning',
            institution: 'Politeknik Negeri Jember',
        },
        {
            photo: '../assets/download.jpeg',
            name: 'Eva Yuliana',
            role: 'Machine Learning',
            institution: 'Politeknik Negeri Jember',
        },
        {
            photo: '../assets/download.jpeg',
            name: 'Mohammad Ilham Islamy',
            role: 'Frontend Developer',
            institution: 'Politeknik Negeri Jember',
        },
        {
            photo: '../assets/download.jpeg',
            name: 'Farid Kurniawan',
            role: 'Backend Developer',
            institution: 'Politeknik Negeri Jember',
        },
        {
            photo: '../assets/download.jpeg',
            name: 'Muhammad Reza Fadlillah',
            role: 'Backend Developer',
            institution: 'Politeknik Negeri Jember',
        },
    ];

    return (
        <section className="container mx-auto py-10 px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Tim Kami</h2>
            <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
                {team.map((member, idx) => (
                    <TeamCard key={idx} {...member} />
                ))}
            </div>
        </section>
    );
};

export default TeamSection;