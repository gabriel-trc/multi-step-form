import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { LocalStorageMultiStepFormRepository } from "./infrastructure/LocalStorageMultiStepFormRepository";
import { Home } from "./sections/home/Home";
import { Layout } from "./sections/layout/Layout";
import { MultiStepForm } from "./sections/multi_step_form/MultiStepForm";
import { MultiStepFormContexProvider } from "./sections/multi_step_form/MultiStepFormContexProvider";

const repository = new LocalStorageMultiStepFormRepository();

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/:uuid",
				element: (
					<MultiStepFormContexProvider>
						<MultiStepForm />
					</MultiStepFormContexProvider>
				),
			},
		],
	},
]);

export function Router() {
	return <RouterProvider router={router} />;
}
