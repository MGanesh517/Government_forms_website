'use client'

import { useState, useRef } from 'react'
import { Upload, Download, Image as ImageIcon, X } from 'lucide-react'

export default function PhotoResizerPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [size, setSize] = useState<'passport' | 'visa' | 'pan' | 'govt-job'>('passport')
  const [backgroundColor, setBackgroundColor] = useState<'white' | 'blue'>('white')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const sizeSpecs = {
    passport: { width: 51, height: 51, unit: 'mm', pixels: '200x200' },
    visa: { width: 51, height: 51, unit: 'mm', pixels: '200x200' },
    pan: { width: 35, height: 45, unit: 'mm', pixels: '140x180' },
    'govt-job': { width: 35, height: 45, unit: 'mm', pixels: '140x180' },
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleProcess = async () => {
    if (!selectedFile || !preview) return

    // Create canvas for image processing
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.onload = () => {
      const spec = sizeSpecs[size]
      const pixelWidth = parseInt(spec.pixels.split('x')[0])
      const pixelHeight = parseInt(spec.pixels.split('x')[1])

      canvas.width = pixelWidth
      canvas.height = pixelHeight

      // Fill background
      ctx.fillStyle = backgroundColor === 'white' ? '#ffffff' : '#0066cc'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Calculate crop and resize
      const imgAspect = img.width / img.height
      const canvasAspect = canvas.width / canvas.height

      let sourceX = 0
      let sourceY = 0
      let sourceWidth = img.width
      let sourceHeight = img.height

      if (imgAspect > canvasAspect) {
        sourceWidth = img.height * canvasAspect
        sourceX = (img.width - sourceWidth) / 2
      } else {
        sourceHeight = img.width / canvasAspect
        sourceY = (img.height - sourceHeight) / 2
      }

      ctx.drawImage(
        img,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        canvas.width,
        canvas.height
      )

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `passport-photo-${size}-${Date.now()}.png`
          a.click()
          URL.revokeObjectURL(url)
        }
      }, 'image/png')
    }
    img.src = preview
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Passport Photo Resizer</h1>

          {/* File Upload */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Photo
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary-500 transition-colors"
            >
              {preview ? (
                <div className="relative inline-block">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-64 rounded-lg shadow-md"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedFile(null)
                      setPreview(null)
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div>
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500 mt-2">PNG, JPG, JPEG up to 10MB</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photo Size
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(['passport', 'visa', 'pan', 'govt-job'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`p-4 border-2 rounded-lg text-center transition-colors ${
                    size === s
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-300 hover:border-primary-300'
                  }`}
                >
                  <div className="font-semibold text-gray-900 capitalize">{s.replace('-', ' ')}</div>
                  <div className="text-sm text-gray-600 mt-1">{sizeSpecs[s].pixels} px</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {sizeSpecs[s].width}x{sizeSpecs[s].height} {sizeSpecs[s].unit}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Background Color */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Background Color
            </label>
            <div className="flex space-x-4">
              {(['white', 'blue'] as const).map((color) => (
                <button
                  key={color}
                  onClick={() => setBackgroundColor(color)}
                  className={`px-6 py-3 border-2 rounded-lg font-medium transition-colors capitalize ${
                    backgroundColor === color
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-300 text-gray-700 hover:border-primary-300'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Process Button */}
          <button
            onClick={handleProcess}
            disabled={!selectedFile}
            className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed inline-flex items-center justify-center"
          >
            <Download className="h-5 w-5 mr-2" />
            Process & Download
          </button>

          {/* Info */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Photo Requirements</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Recent photo (not older than 6 months)</li>
              <li>• Clear face, front view, eyes open</li>
              <li>• Plain background</li>
              <li>• Neutral expression, no smile</li>
              <li>• No head covering (unless for religious reasons)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

