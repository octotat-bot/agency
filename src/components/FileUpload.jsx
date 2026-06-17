import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FileUpload.css';

const FileUpload = ({
    onFilesSelected,
    maxFiles = 5,
    maxSize = 10, // MB
    acceptedTypes = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.gif', '.zip', '.rar'],
    label = 'Upload Files'
}) => {
    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getFileIcon = (fileName) => {
        const ext = fileName.split('.').pop().toLowerCase();
        const icons = {
            pdf: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M9 15h6M9 11h6" />
                </svg>
            ),
            image: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                </svg>
            ),
            zip: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
            ),
            doc: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
            ),
        };

        if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) return icons.image;
        if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) return icons.zip;
        if (['doc', 'docx'].includes(ext)) return icons.doc;
        if (ext === 'pdf') return icons.pdf;
        return icons.doc;
    };

    const validateFile = useCallback((file) => {
        // Check file type
        const ext = '.' + file.name.split('.').pop().toLowerCase();
        if (!acceptedTypes.includes(ext) && !acceptedTypes.includes('*')) {
            return `${file.name}: File type not allowed`;
        }

        // Check file size
        if (file.size > maxSize * 1024 * 1024) {
            return `${file.name}: File too large (max ${maxSize}MB)`;
        }

        return null;
    }, [acceptedTypes, maxSize]);

    const handleFiles = useCallback((newFiles) => {
        setError('');

        if (files.length + newFiles.length > maxFiles) {
            setError(`Maximum ${maxFiles} files allowed`);
            return;
        }

        const validFiles = [];
        const errors = [];

        Array.from(newFiles).forEach(file => {
            const validationError = validateFile(file);
            if (validationError) {
                errors.push(validationError);
            } else {
                validFiles.push({
                    file,
                    id: `${file.name}-${Date.now()}-${Math.random()}`,
                    progress: 0,
                    status: 'ready'
                });
            }
        });

        if (errors.length > 0) {
            setError(errors[0]);
        }

        if (validFiles.length > 0) {
            const updatedFiles = [...files, ...validFiles];
            setFiles(updatedFiles);
            onFilesSelected?.(updatedFiles.map(f => f.file));
        }
    }, [files, maxFiles, validateFile, onFilesSelected]);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    }, [handleFiles]);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const removeFile = useCallback((fileId) => {
        const updatedFiles = files.filter(f => f.id !== fileId);
        setFiles(updatedFiles);
        onFilesSelected?.(updatedFiles.map(f => f.file));
    }, [files, onFilesSelected]);

    const openFilePicker = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="file-upload">
            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={acceptedTypes.join(',')}
                onChange={(e) => handleFiles(e.target.files)}
                className="file-upload__input"
            />

            {/* Drop Zone */}
            <motion.div
                className={`file-upload__dropzone ${isDragging ? 'file-upload__dropzone--active' : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={openFilePicker}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
            >
                <motion.div
                    className="file-upload__icon"
                    animate={isDragging ? { scale: 1.2, y: -10 } : { scale: 1, y: 0 }}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                </motion.div>
                <div className="file-upload__text">
                    <span className="file-upload__label">{label}</span>
                    <span className="file-upload__hint">
                        Drag & drop files here or <span className="file-upload__browse">browse</span>
                    </span>
                    <span className="file-upload__info">
                        Max {maxFiles} files, {maxSize}MB each
                    </span>
                </div>
            </motion.div>

            {/* Error Message */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        className="file-upload__error"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        {error}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* File List */}
            <AnimatePresence>
                {files.length > 0 && (
                    <motion.div
                        className="file-upload__list"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        {files.map((fileItem) => (
                            <motion.div
                                key={fileItem.id}
                                className="file-upload__file"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20, height: 0 }}
                                layout
                            >
                                <div className="file-upload__file-icon">
                                    {getFileIcon(fileItem.file.name)}
                                </div>
                                <div className="file-upload__file-info">
                                    <span className="file-upload__file-name">
                                        {fileItem.file.name}
                                    </span>
                                    <span className="file-upload__file-size">
                                        {formatFileSize(fileItem.file.size)}
                                    </span>
                                </div>
                                <motion.button
                                    className="file-upload__remove"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFile(fileItem.id);
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </motion.button>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* File Count */}
            {files.length > 0 && (
                <div className="file-upload__count">
                    {files.length} of {maxFiles} files selected
                </div>
            )}
        </div>
    );
};

export default FileUpload;
