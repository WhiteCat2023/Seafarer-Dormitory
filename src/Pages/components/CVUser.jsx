export default function CVUser({isOpen, onClose, item}){
    return(
        <>

            <div className={`${isOpen ? 'block' : 'none'}`}>
                {item.apartment_name}
                <a onClick={onClose}>Back</a>
            </div>
        </>
    );
}