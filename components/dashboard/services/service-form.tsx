"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { X, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PriceItem {
  label: string;
  price: number;
}

export function ServiceForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [prices, setPrices] = useState<PriceItem[]>([{ label: "", price: 0 }]);
  const [discount, setDiscount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [banner, setBanner] = useState("");
  const [images, setImages] = useState<string[]>([""]);
  const [featured, setFeatured] = useState(false);
  const [keywords, setKeywords] = useState<string[]>([""]);
  const [serviceCount, setServiceCount] = useState(0);

  const addPriceItem = () => {
    setPrices([...prices, { label: "", price: 0 }]);
  };

  const removePriceItem = (index: number) => {
    setPrices(prices.filter((_, i) => i !== index));
  };

  const updatePriceItem = (
    index: number,
    field: "label" | "price",
    value: string | number
  ) => {
    const newPrices = [...prices];
    newPrices[index] = { ...newPrices[index], [field]: value };
    setPrices(newPrices);
  };

  const addImage = () => {
    setImages([...images, ""]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const updateImage = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const addKeyword = () => {
    setKeywords([...keywords, ""]);
  };

  const removeKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const updateKeyword = (index: number, value: string) => {
    const newKeywords = [...keywords];
    newKeywords[index] = value;
    setKeywords(newKeywords);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      name,
      description,
      prices: prices.filter((p) => p.label && p.price > 0),
      discount,
      duration,
      status,
      banner,
      images: images.filter((img) => img),
      featured,
      keywords: keywords.filter((k) => k),
      service_count: serviceCount,
    };
    console.log("Form submitted:", formData);
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-semibold tracking-tight">
          Create Service
        </CardTitle>
        <CardDescription>
          Fill in the details to create a new service or product
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">
              Basic Information
            </h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter service name"
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your service"
                  rows={4}
                  className="resize-none"
                />
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Pricing</h2>
              <Button
                type="button"
                onClick={addPriceItem}
                variant="outline"
                size="sm"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Price
              </Button>
            </div>

            <div className="space-y-3">
              {prices.map((price, index) => (
                <Card key={index} className="bg-secondary/50">
                  <CardContent className="flex gap-3 p-4">
                    <div className="flex-1 space-y-2">
                      <Label className="text-sm">Label</Label>
                      <Input
                        value={price.label}
                        onChange={(e) =>
                          updatePriceItem(index, "label", e.target.value)
                        }
                        placeholder="e.g., Basic, Premium"
                        className="h-9"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label className="text-sm">Price</Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={price.price}
                        onChange={(e) =>
                          updatePriceItem(
                            index,
                            "price",
                            Number.parseFloat(e.target.value) || 0
                          )
                        }
                        placeholder="0.00"
                        className="h-9"
                      />
                    </div>
                    {prices.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removePriceItem(index)}
                        className="mt-7 h-9 w-9"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="discount">Discount (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  min="0"
                  max="100"
                  value={discount}
                  onChange={(e) =>
                    setDiscount(Number.parseFloat(e.target.value) || 0)
                  }
                  placeholder="0"
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="0"
                  value={duration}
                  onChange={(e) =>
                    setDuration(Number.parseFloat(e.target.value) || 0)
                  }
                  placeholder="0"
                  className="h-10"
                />
              </div>
            </div>
          </section>

          {/* Status & Settings */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">
              Status & Settings
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={status}
                  onValueChange={(value: "active" | "inactive") =>
                    setStatus(value)
                  }
                >
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="service-count">Service Count</Label>
                <Input
                  id="service-count"
                  type="number"
                  min="0"
                  value={serviceCount}
                  onChange={(e) =>
                    setServiceCount(Number.parseFloat(e.target.value) || 0)
                  }
                  placeholder="0"
                  className="h-10"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
              <Switch
                id="featured"
                checked={featured}
                onCheckedChange={setFeatured}
              />
              <div className="flex-1">
                <Label
                  htmlFor="featured"
                  className="cursor-pointer font-medium"
                >
                  Featured
                </Label>
                <p className="text-sm text-muted-foreground">
                  Display this service prominently
                </p>
              </div>
            </div>
          </section>

          {/* Media */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Media</h2>

            <div className="space-y-2">
              <Label htmlFor="banner">Banner Image URL</Label>
              <Input
                id="banner"
                value={banner}
                onChange={(e) => setBanner(e.target.value)}
                placeholder="https://example.com/banner.jpg"
                className="h-10"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Additional Images</Label>
                <Button
                  type="button"
                  onClick={addImage}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Image
                </Button>
              </div>

              {images.map((image, index) => (
                <div key={index} className="flex gap-3">
                  <Input
                    value={image}
                    onChange={(e) => updateImage(index, e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="h-10"
                  />
                  {images.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeImage(index)}
                      className="h-10 w-10"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Keywords */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Keywords
              </h2>
              <Button
                type="button"
                onClick={addKeyword}
                variant="outline"
                size="sm"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Keyword
              </Button>
            </div>

            <div className="space-y-3">
              {keywords.map((keyword, index) => (
                <div key={index} className="flex gap-3">
                  <Input
                    value={keyword}
                    onChange={(e) => updateKeyword(index, e.target.value)}
                    placeholder="Enter keyword"
                    className="h-10"
                  />
                  {keywords.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeKeyword(index)}
                      className="h-10 w-10"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" className="min-w-32">
              Create Service
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
