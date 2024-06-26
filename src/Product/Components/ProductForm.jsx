import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { UpdateProduct, addProduct } from '../../Firebase/Functions';
import { LogInContext } from '../../Login/Context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ProductContext } from '../Contexts';

export const ProductForm = () => {
  const { user } = useContext(LogInContext);
  const [activeSection, setActiveSection] = useState('BasicInfo');

  const { productToEdit } = useContext(ProductContext);

  const [isEditing, setIsEditing] = useState(productToEdit);

  console.log(productToEdit);

  const navigate = useNavigate();

  const toggleSection = (section) => {
    setActiveSection(section);
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const SaveData = (data) => {
    if (!data) {
      toast.error('An error ocurred, try again!');
      return;
    }

    if (isEditing) {
      toast.promise(UpdateProduct(data, productToEdit.id), {
        loading: 'Updating product...',
        success: () => {
          navigate('/', { replace: true });
          return `Product ${productToEdit.productName} updated successfully!`;
        },
        error: 'An error ocurred while trying to save data.',
      });
    } else {
      const newProduct = { ...data, createdBy: user.uid, enabled: true };

      toast.promise(addProduct(newProduct), {
        loading: 'Adding product...',
        success: 'Product added successfully!',
        error: 'An error ocurred while trying to save data.',
      });

      navigate('/', { replace: true });
    }
  };

  return (
    <>
      <div className="p-4 bg-gray-100 min-h-screen flex flex-col">
        <form onSubmit={handleSubmit(SaveData)} className="bg-gray-100">
          <div className=" gap-8 bg-gray-100">
            <div className="container mx-auto py-8 ">
              <div className="flex justify-center mb-8">
                <button
                  className={`px-4 py-2 rounded-l-md ${
                    activeSection === 'BasicInfo'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={(e) => {
                    e.preventDefault(); // Evita el envío del formulario
                    toggleSection('BasicInfo');
                  }}
                >
                  Basic Information
                </button>
                <button
                  className={`px-4 py-2 rounded-r-md ${
                    activeSection === 'AdditionalInfo'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={(e) => {
                    e.preventDefault(); // Evita el envío del formulario
                    toggleSection('AdditionalInfo');
                  }}
                >
                  Information Additional
                </button>

                <button
                  className={`px-4 py-2 rounded-l-md ${
                    activeSection === 'visualMedia'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={(e) => {
                    e.preventDefault(); // Evita el envío del formulario
                    toggleSection('visualMedia');
                  }}
                >
                  Visual Media
                </button>
              </div>
              {activeSection === 'BasicInfo' && (
                <div className="bg-white p-6 rounded-lg shadow-lg ">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 font-semibold mb-2"
                          htmlFor="category"
                        >
                          Category
                        </label>
                        <select
                          {...register('Category', {
                            required: true,
                            value: productToEdit?.Category,
                          })}
                          className="border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring focus:ring-gray-400"
                          id="category"
                        >
                          <option value="Business">Business</option>
                          <option value="Analytics">Analytics</option>
                          <option value="Design">Design</option>
                          <option value="Database">Database</option>
                          <option value="Communication">Communication</option>
                          <option value="Storage">Storage</option>
                          <option value="Development">Development</option>
                          <option value="Management">Management</option>
                          <option value="Security">Security</option>
                          <option value="Productivity">Productivity</option>
                        </select>
                        {errors.Category && (
                          <p className="mt-2 text-red-500 text-sm">
                            This field is required
                          </p>
                        )}
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 font-semibold mb-2"
                          htmlFor="shortDescription"
                        >
                          Product Short Description
                        </label>
                        <textarea
                          {...register('productShortDescription', {
                            required: true,
                            value: productToEdit?.productShortDescription,
                          })}
                          className="border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring focus:ring-gray-400"
                          id="shortDescription"
                          placeholder="Product short description"
                        />
                        {errors.productShortDescription && (
                          <p className="mt-2 text-red-500 text-sm">
                            This field is required
                          </p>
                        )}
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 font-semibold mb-2"
                          htmlFor="platform"
                        >
                          Product Platform
                        </label>
                        <select
                          {...register('productPlatform', { required: true })}
                          className="border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring focus:ring-gray-400"
                          id="platform"
                        >
                          <option value="Android">Android</option>
                          <option value="Web">Web</option>
                          <option value="Windows">Windows</option>
                          <option value="iOS">iOS</option>
                          <option value="Linux">Linux</option>
                          <option value="Mac">Mac</option>
                        </select>
                        {errors.productPlatform && (
                          <p className="mt-2 text-red-500 text-sm">
                            This field is required
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-center items-center">
                      <img
                        src="https://cdn.dribbble.com/users/668001/screenshots/3861883/data-graphic-animation.gif"
                        alt="Imagen"
                        className="max-w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
              )}
              {activeSection === 'AdditionalInfo' && (
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex justify-center items-center mb-4">
                      <img
                        src="Presentation 5.svg"
                        alt="Imagen"
                        className="w-2/3"
                      />
                    </div>
                    <div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 font-bold mb-2"
                          htmlFor="productName"
                        >
                          Product Name
                        </label>
                        <input
                          {...register('productName', {
                            required: true,
                            value: productToEdit?.productName,
                          })}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="productName"
                          type="text"
                          placeholder="Product Name"
                        />
                        {errors.productName && (
                          <p className="mt-2 text-red-500 text-xs">
                            This field is required
                          </p>
                        )}
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 font-bold mb-2"
                          htmlFor="longDescription"
                        >
                          Product Long Description
                        </label>
                        <textarea
                          {...register('longDescription', {
                            required: true,
                            value: productToEdit?.longDescription,
                          })}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="longDescription"
                          placeholder="Product long description"
                        />
                        {errors.longDescription && (
                          <p className="mt-2 text-red-500 text-xs">
                            This field is required
                          </p>
                        )}
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 font-bold mb-2"
                          htmlFor="productType"
                        >
                          Software Product Type
                        </label>
                        <select
                          {...register('softwareProductType', {
                            required: true,
                          })}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="productType"
                        >
                          <option value="SaaS">SaaS</option>
                          <option value="PaaS">PaaS</option>
                          <option value="IaaS">IaaS</option>
                        </select>
                        {errors.softwareProductType && (
                          <p className="mt-2 text-red-500 text-xs">
                            This field is required
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'visualMedia' && (
                <div className="bg-white p-8 rounded-md shadow-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 font-bold mb-2"
                          htmlFor="mediaLink1"
                        >
                          Media Link 1
                        </label>
                        <input
                          {...register('MediaLink1', {
                            required: true,
                            value: productToEdit?.MediaLink1,
                          })}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="mediaLink1"
                          type="text"
                          placeholder="Media Link 1"
                        />
                        {errors.MediaLink1 && (
                          <p className="mt-2 text-red-500 text-xs">
                            This field is required
                          </p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-gray-700 font-bold mb-2"
                          htmlFor="pictureLink"
                        >
                          Picture Link
                        </label>
                        <input
                          {...register('picture', {
                            required: true,
                            value: productToEdit?.picture,
                          })}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="pictureLink"
                          type="text"
                          placeholder="Picture Link"
                        />
                        {errors.picture && (
                          <p className="mt-2 text-red-500 text-xs">
                            This field is required
                          </p>
                        )}
                      </div>
                    </div>
                    <div className=" flex items-center justify-center md:justify-center">
                      <img className="w-3/5" src="Notification.svg" alt="" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
        {activeSection === 'visualMedia' && (
          <div className="flex justify-center mt-4">
            {isEditing ? (
              <>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-4"
                  onClick={handleSubmit(SaveData)}
                >
                  Save Changes
                </button>
                <div className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                  Cancel
                </div>
              </>
            ) : (
              <>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  onClick={handleSubmit(SaveData)}
                >
                  Submit
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};
