import { Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const InputSearch = () => {
    return (
        <div className='flex flex-1 items-center space-x-1'>
            <Input type='text' placeholder='Buscar' className='h-10 text-primary' />
            <Button type='submit' className='bg-success'>
                <Search strokeWidth={1} />
            </Button>
        </div>
    );
};

export default InputSearch;
