import { Dialog, DialogPanel, DialogTitle, Description } from '@headlessui/react';
import { FiClock } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';

export const RecipeModal = ({ isOpen, onClose, recipe }) => {
  if (!recipe) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <DialogPanel className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
          >
            <MdClose className="w-6 h-6" />
          </button>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative h-80 md:h-full">
              <img
                src={recipe.image_url}
                alt={recipe.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto">
              <DialogTitle as="h3" className="text-2xl font-bold mb-2">
                {recipe.title}
              </DialogTitle>

              <Description className="text-gray-600 mb-4">
                {recipe.description}
              </Description>

              <div className="flex gap-4 mb-6">
                <span className="flex items-center text-sm text-gray-600">
                  <FiClock className="w-4 h-4 mr-1" />
                  {recipe.category}
                </span>
              </div>

              <div className="space-y-8">
                <section>
                  <h4 className="text-lg font-semibold mb-4">Ingredients</h4>
                  <ul className="space-y-2">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 mt-2 mr-3 bg-blue-500 rounded-full" />
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h4 className="text-lg font-semibold mb-4">Instructions</h4>
                  <ol className="space-y-4">
                    {recipe.steps.map((step, index) => (
                      <li key={index} className="flex">
                        <span className="flex-shrink-0 w-6 h-6 mr-3 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">
                          {index + 1}
                        </span>
                        <p className="text-gray-600">{step}</p>
                      </li>
                    ))}
                  </ol>
                </section>
              </div>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};