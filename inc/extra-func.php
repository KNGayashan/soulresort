<?php
class DocumentHandler {
    // Allowed file types and their MIME types
    private static $allowed_types = [
        'pdf' => 'application/pdf',
        'excel' => [
            'application/vnd.ms-excel', // .xls
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
            'application/vnd.oasis.opendocument.spreadsheet' // .ods
        ],
        'word' => [
            'application/msword', // .doc
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
            'application/vnd.oasis.opendocument.text' // .odt
        ]
    ];

    // File size limits in bytes
    private static $size_limits = [
        'pdf' => 20 * 1024 * 1024,    // 20MB for PDFs
        'excel' => 15 * 1024 * 1024,  // 15MB for Excel files
        'word' => 15 * 1024 * 1024    // 15MB for Word documents
    ];

    // Get file type category based on MIME type
    private static function get_file_category($mime_type) {
        foreach (self::$allowed_types as $category => $mime_types) {
            if (is_array($mime_types)) {
                if (in_array($mime_type, $mime_types)) return $category;
            } else {
                if ($mime_type === $mime_types) return $category;
            }
        }
        return null;
    }

    // Get human-readable file size
    public static function format_file_size($bytes) {
        $units = ['B', 'KB', 'MB', 'GB'];
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);
        $bytes /= pow(1024, $pow);
        return round($bytes, 2) . ' ' . $units[$pow];
    }

    // Get icon class based on file type
    public static function get_file_icon($mime_type) {
        $category = self::get_file_category($mime_type);
        switch ($category) {
            case 'pdf':
                return 'far fa-file-pdf text-danger';
            case 'excel':
                return 'far fa-file-excel text-success';
            case 'word':
                return 'far fa-file-word text-primary';
            default:
                return 'far fa-file text-secondary';
        }
    }

    // Validate and get document files
    public static function get_validated_documents($post_id) {
        try {
            // Get the resources from ACF
            $resources = get_field('resource_download', $post_id);
            if (!$resources || !isset($resources['resources_list'])) {
                throw new Exception('No resources found.');
            }

            $valid_files = [];
            $errors = [];
            $warnings = [];

            foreach ($resources['resources_list'] as $index => $resource) {
                try {
                    if (empty($resource['resource'])) {
                        $warnings[] = "Skipped empty resource entry at index {$index}.";
                        continue;
                    }

                    $file = $resource['resource'];
                    $file_path = get_attached_file($file['ID']);

                    // Basic file checks
                    if (!$file_path || !file_exists($file_path)) {
                        throw new Exception("File not found: {$file['filename']}");
                    }

                    if (!is_readable($file_path)) {
                        throw new Exception("File not readable: {$file['filename']}");
                    }

                    // Validate file type and size
                    $file_type = wp_check_filetype($file_path);
                    $category = self::get_file_category($file_type['type']);
                    $file_size = filesize($file_path);

                    if (!$category) {
                        $warnings[] = "Skipping file {$file['filename']} - unsupported type.";
                        continue;
                    }

                    if ($file_size > self::$size_limits[$category]) {
                        $warnings[] = "Skipping file {$file['filename']} - exceeds size limit.";
                        continue;
                    }

                    // Add to valid files
                    $valid_files[] = [
                        'path' => $file_path,
                        'name' => sanitize_file_name($file['filename']),
                        'type' => $category,
                        'mime' => $file_type['type'],
                        'size' => $file_size,
                        'icon' => self::get_file_icon($file_type['type']),
                        'url' => $file['url'],
                        'title' => $file['title'] ?: $file['filename']
                    ];

                } catch (Exception $e) {
                    $errors[] = $e->getMessage();
                }
            }

            return [
                'success' => !empty($valid_files),
                'files' => $valid_files,
                'errors' => $errors,
                'warnings' => $warnings,
                'total_files' => count($valid_files),
                'total_size' => array_sum(array_column($valid_files, 'size'))
            ];

        } catch (Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage(),
                'files' => [],
                'errors' => [$e->getMessage()],
                'warnings' => [],
                'total_files' => 0,
                'total_size' => 0
            ];
        }
    }

    // Create and send ZIP file
    public static function create_documents_zip($files, $post_id) {
        try {
            if (empty($files)) {
                throw new Exception('No valid files to compress.');
            }
    
            // Create temporary directory
            $temp_dir = get_temp_dir() . 'doc_export_' . uniqid();
            if (!wp_mkdir_p($temp_dir)) {
                throw new Exception('Failed to create temporary directory.');
            }
    
            // Create ZIP file
            $post_title = get_the_title($post_id);
            $zip_name = sanitize_title($post_title) . '_resources.zip' . date('Y-m-d_H-i') . '.zip';
            $zip_path = $temp_dir . '/' . $zip_name;
    
            $zip = new ZipArchive();
            if ($zip->open($zip_path, ZipArchive::CREATE) !== TRUE) {
                throw new Exception('Failed to create ZIP file.');
            }
    
            // Add files to ZIP without category folders
            foreach ($files as $file) {
                $zip->addFile($file['path'], $file['name']);
            }
    
            $zip->close();
    
            // Verify ZIP creation
            if (!file_exists($zip_path)) {
                throw new Exception('ZIP file creation failed.');
            }
    
            // Send file headers
            header('Content-Type: application/zip');
            header('Content-Disposition: attachment; filename="' . $zip_name . '"');
            header('Content-Length: ' . filesize($zip_path));
            header('Pragma: no-cache');
    
            // Output file
            readfile($zip_path);
            
            // Clean up
            self::cleanup_temp_files($temp_dir);
            exit;
    
        } catch (Exception $e) {
            if (isset($temp_dir)) {
                self::cleanup_temp_files($temp_dir);
            }
            throw $e;
        }
    }

    // Clean up temporary files
    private static function cleanup_temp_files($dir) {
        if (!is_dir($dir)) return;

        $files = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($dir, RecursiveDirectoryIterator::SKIP_DOTS),
            RecursiveIteratorIterator::CHILD_FIRST
        );

        foreach ($files as $file) {
            if ($file->isDir()) {
                rmdir($file->getRealPath());
            } else {
                unlink($file->getRealPath());
            }
        }
        rmdir($dir);
    }
}

// AJAX handler for document download
function handle_documents_zip_download() {
    try {
        // Verify nonce
        if (!check_ajax_referer('document_download_nonce', 'nonce', false)) {
            throw new Exception('Security check failed.');
        }

        // Validate post ID
        $post_id = isset($_POST['post_id']) ? intval($_POST['post_id']) : 0;
        if (!$post_id || !get_post($post_id)) {
            throw new Exception('Invalid post ID.');
        }

        // Get and validate files
        $result = DocumentHandler::get_validated_documents($post_id);
        if (!$result['success']) {
            throw new Exception($result['error'] ?? 'Document validation failed.');
        }

        if (empty($result['files'])) {
            throw new Exception('No valid files found for download.');
        }

        // Create and send ZIP
        DocumentHandler::create_documents_zip($result['files'], $post_id);
        exit;

    } catch (Exception $e) {
        wp_send_json_error([
            'message' => $e->getMessage()
        ]);
    }
}

// Register AJAX actions
add_action('wp_ajax_download_all_documents', 'handle_documents_zip_download');
add_action('wp_ajax_nopriv_download_all_documents', 'handle_documents_zip_download');

// Enqueue necessary assets
function enqueue_document_handler_assets() {
    if (is_singular('responsible-sourcing')) {  // Only on RSF Tool single pages
        wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
        
        wp_enqueue_script('document-handler', get_template_directory_uri() . '/js/document-handler.js', array('jquery'), '1.0', true);
        
        wp_localize_script('document-handler', 'documentAjax', array(
            'ajaxurl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('document_download_nonce')
        ));
    }
}
add_action('wp_enqueue_scripts', 'enqueue_document_handler_assets');