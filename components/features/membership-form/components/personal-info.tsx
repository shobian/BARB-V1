import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import type { ComponentProps } from '../types/form-types';

export function PersonalInfo({ formData, updateFormData }: ComponentProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateFormData({ [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'front' | 'back') => {
        const file = e.target.files?.[0];
        if (file) {
            const key = type === 'front' ? 'nicFrontFile' : 'nicBackFile';
            const nameField = type === 'front' ? 'nicFrontFileName' : 'nicBackFileName';
            updateFormData({
                [nameField]: file.name,
                files: { ...formData.files, [key]: file },
            });
        }
    };

    const nicFrontFile = formData.files?.['nicFrontFile'] ?? null;
    const nicBackFile = formData.files?.['nicBackFile'] ?? null;

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Section 1. Personal Information</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <Label htmlFor="firstName">First name <span className="text-red-500">*</span></Label>
                    <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="surname">Surname <span className="text-red-500">*</span></Label>
                    <Input
                        id="surname"
                        name="surname"
                        value={formData.surname || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="dateOfBirth">Date of Birth <span className="text-red-500">*</span></Label>
                    <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="sm:col-span-2">
                    <Label htmlFor="addressLine">Address Line <span className="text-red-500">*</span></Label>
                    <Input
                        id="addressLine"
                        name="addressLine"
                        value={formData.addressLine || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="city">City <span className="text-red-500">*</span></Label>
                    <Input
                        id="city"
                        name="city"
                        value={formData.city || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="postCode">Post Code <span className="text-red-500">*</span></Label>
                    <Input
                        id="postCode"
                        name="postCode"
                        value={formData.postCode || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="phone">Phone <span className="text-red-500">*</span></Label>
                    <Input
                        id="phone"
                        name="phone"
                        value={formData.phone || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="phoneOptional">Phone (Optional) </Label>
                    <Input
                        id="phoneOptional"
                        name="phoneOptional"
                        value={formData.phoneOptional || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="sm:col-span-2">
                    <Label htmlFor="nicOrPassport">NIC or Passport <span className="text-red-500">*</span></Label>
                    <Input
                        id="nicOrPassport"
                        name="nicOrPassport"
                        value={formData.nicOrPassport || ''}
                        onChange={handleChange}
                        required
                    />
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="mt-2 ">
                            <Label htmlFor="nicFrontFileUpload">NIC/Passport Front Image </Label>
                            <input
                                type="file"
                                id="nicFrontFileUpload"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'front')}
                                className="hidden"
                            />
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => document.getElementById('nicFrontFileUpload')?.click()}
                            >
                                Upload Front Image
                            </Button>
                            {nicFrontFile && (
                                <div className="mt-2 border-dotted border-2 border-gray-300 p-2 rounded">
                                    <img src={URL.createObjectURL(nicFrontFile)} alt="NIC Front" className="w-32 h-32 object-cover mx-auto" />
                                    <span className="text-sm text-gray-600 block text-center mt-2">{nicFrontFile.name}</span>
                                </div>
                            )}
                        </div>
                        <div className="mt-2">
                            <Label htmlFor="nicBackFileUpload">NIC/Passport Back Image </Label>
                            <input
                                type="file"
                                id="nicBackFileUpload"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'back')}
                                className="hidden"
                            />
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => document.getElementById('nicBackFileUpload')?.click()}
                            >
                                Upload Back Image
                            </Button>
                            {nicBackFile && (
                                <div className="mt-2 border-dotted border-2 border-gray-300 p-2 rounded">
                                    <img src={URL.createObjectURL(nicBackFile)} alt="NIC Back" className="w-32 h-32 object-cover mx-auto" />
                                    <span className="text-sm text-gray-600 block text-center mt-2">{nicBackFile.name}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">* Required fields</p>
        </div>
    );
}
