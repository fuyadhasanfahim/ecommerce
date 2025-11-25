import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'New Product | ',
};

export default function NewProductPage() {
    return (
        <section className="mx-auto max-w-2xl">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">New Product</CardTitle>
                    <CardDescription className="font-serif">
                        To add the new product fill the form with nesery
                        information, and click in the add button.
                    </CardDescription>
                </CardHeader>
                <CardContent></CardContent>
                <CardFooter></CardFooter>
            </Card>
        </section>
    );
}
