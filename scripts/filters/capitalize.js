const Capitalize = () => {
    return (name) => {
        return name.split(' ').reduce((prev, curr) => {
            prev += curr.charAt(0).toUpperCase() + curr.substr(1) + ' ';
            return prev;
        },'');
    }
};

export default Capitalize;