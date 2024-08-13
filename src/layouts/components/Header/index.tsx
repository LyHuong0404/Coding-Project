import React from 'react';


const Header: React.FC<{}> = () => {
    return (
        <header className="bg-indigo-300">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center p-6 lg:px-8">
                <div className="flex">
                    <img
                        alt=""
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        className="h-10 w-auto"
                    />
                </div>
                <h4 className="flex-1 ml-4 text-lg font-semibold leading-6 text-gray-900">
                    Infinite Scrolling and Searchable Product List
                </h4>
            </nav>
        </header>
    );
};

export default Header;
